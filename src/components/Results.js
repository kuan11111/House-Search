import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Results.css"; // 引入美化樣式

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Results() {
    const query = useQuery();
    const navigate = useNavigate(); // 用於返回首頁
    const city = query.get("city") || "";
    const district = query.get("district") || "";
    const maxPrice = query.get("max_price") || 9999999;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskId, setTaskId] = useState(null);

    useEffect(() => {
        if (!city || !district) {
            alert("請選擇縣市與區域！");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/search_sales", {
                    city,
                    district,
                    max_price: maxPrice
                });
                setTaskId(response.data.task_id);
            } catch (error) {
                console.error("❌ 查詢失敗", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [city, district, maxPrice]);

    useEffect(() => {
        if (!taskId) return;

        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get_results/${taskId}`);
                if (response.data.status !== "processing") {
                    setResults(response.data);
                    setLoading(false);
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("❌ 取得結果失敗", error);
                setLoading(false);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [taskId]);

    // 🔹 返回首頁
    const goBack = () => {
        navigate("/");
    };

    // 🔹 重新查詢（刷新當前頁面）
    const refreshSearch = () => {
        setResults([]);
        setLoading(true);
        setTaskId(null);
        window.location.reload(); // 強制刷新頁面
    };

    return (
        <div className="results-container">
            <h1 className="title">🏡 房屋實價登錄查詢結果</h1>
            <div className="search-info">
                <p>🔍 查詢條件：<strong>{city} {district}</strong>，最高價格：<strong>{maxPrice} 萬</strong></p>
            </div>
            {/* 🔹 返回 & 重新查詢按鈕 */}
            <div className="button-group">
                <button className="back-button" onClick={goBack}>🔙 返回首頁</button>
                <button className="refresh-button" onClick={refreshSearch}>🔄 重新查詢</button>
            </div>

            {loading ? (
                <p className="loading">⏳ 正在查詢中，請稍候...</p>
            ) : results.error ? (
                <p className="error-message">❌ {results.error}</p>
            ) : (
                <div className="results-list">
                    {results.map((house, index) => (
                        <div key={index} className="result-card">
                            <p><strong>📍 地址：</strong> {house.address}</p>
                            <p><strong>💰 價格：</strong> {house.price} 萬</p>
                            <p><strong>🏠 區域：</strong> {house.district}</p>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default Results;

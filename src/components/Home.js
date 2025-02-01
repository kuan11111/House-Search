import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // 引入 CSS 樣式


const taiwanCities = {
    "臺北市": ["中正區", "大同區", "中山區", "萬華區", "信義區", "松山區", "大安區", "南港區", "北投區", "內湖區", "士林區", "文山區"],
    "新北市": ["板橋區", "新莊區", "泰山區", "林口區", "淡水區", "金山區", "八里區", "萬里區", "石門區", "三芝區", "瑞芳區"],
    "基隆市": ["仁愛區", "中正區", "信義區", "中山區", "安樂區", "暖暖區", "七堵區"],
    "桃園市": ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "龜山區", "龍潭區", "大溪區", "大園區"],
    "臺中市": ["中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區"],
    "臺南市": ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區"],
    "高雄市": ["楠梓區", "左營區", "鼓山區", "三民區", "鹽埕區", "前金區", "新興區", "苓雅區", "前鎮區", "小港區"],
    "屏東縣": ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉"],
    "花蓮縣": ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉"],
    "臺東縣": ["臺東市", "成功鎮", "關山鎮", "長濱鄉", "海端鄉", "池上鄉", "東河鄉", "鹿野鄉"],
};

function Home() {
    const [selectedCity, setSelectedCity] = useState("");
    const [district, setDistrict] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setDistrict("");
    };

    const handleSearch = () => {
        if (!selectedCity || !district) {
            alert("請選擇縣市與區域！");
            return;
        }
        navigate(`/results?city=${encodeURIComponent(selectedCity)}&district=${encodeURIComponent(district)}&max_price=${encodeURIComponent(maxPrice)}`);
    };


    return (
        <div className="home-container">
            <h1 className="title">🏠 房屋買賣查詢</h1>

            <div className="form-group">
                <label className="label">📍 選擇縣市：</label>
                <select value={selectedCity} onChange={handleCityChange} className="dropdown">
                    <option value="">請選擇縣市</option>
                    {Object.keys(taiwanCities).map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="label">🏢 選擇區域：</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="dropdown" disabled={!selectedCity}>
                    <option value="">請選擇區域</option>
                    {selectedCity &&
                        taiwanCities[selectedCity].map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="label">💰 最高價格（萬）：</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="輸入最高價格"
                    className="input-field"
                />
            </div>

            <button onClick={handleSearch} className="search-button">🔍 搜尋</button>
        </div>
    );
}

export default Home;

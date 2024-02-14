import React, { useState } from "react";

function PasswordPage() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="homeBackground">
      <header className="App-header">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #007bff",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        />
      </header>
    </div>
  );
}

export default PasswordPage;

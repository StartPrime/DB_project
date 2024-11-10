import { useState } from "react";
import axios from "axios";
import styles from "./Registration.module.scss";

const Registration = () => {
  const [contactMethod, setContactMethod] = useState("email");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: username,
      surname: surname,
      phone: contactInfo,
      passwordHash: password,
    };

    try {
      const api = axios.create({
        baseURL: "http://localhost:8080", // Укажите нужный порт здесь
      });

      const response = await api.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token; // Предполагается, что сервер возвращает токен в поле "token"
      localStorage.setItem("authToken", token); // Сохраняем токен в localStorage

      // Здесь можно добавить редирект или другое действие после успешной регистрации
    } catch (error) {
      console.error("Ошибка:", error);
      // Здесь можно обработать ошибку, например, показать сообщение пользователю
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Имя пользователя
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="surname">
            Фамилия
          </label>
          <input
            className={styles.input}
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Способ связи</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="email"
                checked={contactMethod === "email"}
                onChange={handleContactMethodChange}
              />
              Электронная почта
            </label>
            <label>
              <input
                type="radio"
                value="phone"
                checked={contactMethod === "phone"}
                onChange={handleContactMethodChange}
              />
              Телефон
            </label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor={contactMethod}>
            Введите{" "}
            {contactMethod === "email" ? "электронную почту" : "номер телефона"}
          </label>
          <input
            className={styles.input}
            type={contactMethod === "email" ? "email" : "tel"}
            id={contactMethod}
            name={contactMethod}
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;

// src/components/AuthModal.jsx
import React, { useState } from 'react';
import '../assets/AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const userData = { name, email, phone, photo };

    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
    const method = 'POST';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токен и пользователя
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        onLogin?.(data.user); // или onRegister
        onClose();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Ошибка подключения к серверу');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        <div className="form-group">
          <label>Телефон</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 912 666 35 00"
          />
        </div>

        {!isLogin && (
          <>
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Анна"
              />
            </div>
            <div className="form-group">
              <label>Email (опционально)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
              />
            </div>
            <div className="form-group">
              <label>Фото</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {photo && (
                <img
                  src={photo}
                  alt="Превью"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', marginTop: '8px' }}
                />
              )}
            </div>
          </>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <p>
          <button  onClick={() => setIsLogin(!isLogin)} className="toggle-mode submit-btn">
            {isLogin
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

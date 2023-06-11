import React from "react";
import MyInput from "../../../components/MyInput/MyInput";
function RegisterObjForm({ data, setData }) {
  return (
    <div className="regist-form">
      <h3 className="regist-form__title">Основная информация</h3>
      <MyInput
        onChange={(e) => {setData({ ...data, nameOtel: e.target.value })}}
        value={data.nameOtel}
        required={true}
        placeholder="Название отеля"
      />
      <div className="regist-form__lable">Контактные данные</div>
      <MyInput
        onChange={(e) => setData({ ...data, address: e.target.value })}
        value={data.address}
        required={true}
        placeholder="Название адрес сайта"
      />
      <div className="regist-form__double-input">
        <MyInput
          onChange={(e) => setData({ ...data, contact: e.target.value })}
          value={data.contact}
          required={true}
          placeholder="Контактное лицо"
        />
        <MyInput
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          required={true}
          placeholder="Электронная почта"
        />
      </div>
      <div className="regist-form__lable">Где находится объект </div>
      <div className="regist-form__double-input">
        <MyInput
          onChange={(e) => setData({ ...data, state: e.target.value })}
          value={data.state}
          required={true}
          placeholder="Страна"
        />
        <MyInput
          onChange={(e) => setData({ ...data, city: e.target.value })}
          value={data.city}
          required={true}
          placeholder="Город"
        />
      </div>
      <MyInput
        onChange={(e) => setData({ ...data, street: e.target.value })}
        value={data.street}
        required={true}
        placeholder="Улица и номер дома"
      />
    </div>
  );
}

export default RegisterObjForm;

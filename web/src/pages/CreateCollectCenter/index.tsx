import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import api from "../../services/api";
import locationsApi from "../../services/locationsApi";

import Dropzone from "../../components/Dropzone";

import "./styles.css";

import logo from "../../assets/logo.svg";

interface RecyclableItem {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEStateResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreateCollectCenter = () => {
  const [items, setItems] = useState<RecyclableItem[]>([]);
  const [stateInitials, setStateInitials] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedState, setSelectedState] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("recyclable-item").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    locationsApi
      .get<IBGEStateResponse[]>("/estados?orderBy=nome")
      .then((response) => {
        const initials = response.data.map((uf) => uf.sigla);

        setStateInitials(initials);
      });
  }, []);

  useEffect(() => {
    if (selectedState === "0") return;

    locationsApi
      .get<IBGECityResponse[]>(
        `/estados/${selectedState}/municipios?orderBy=nome`
      )
      .then((response) => {
        const cityNames = response.data.map((uf) => uf.nome);

        setCities(cityNames);
      });
  }, [selectedState]);

  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const state = selectedState;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("city", city);
    data.append("state", state);
    data.append("items", items.join(","));

    if (selectedFile) data.append("image", selectedFile);

    api.post("collection-center", data);

    alert("Collection Center created!");

    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Recycollection" />

        <Link to="/">
          <FiArrowLeft />
          Back to homepage
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Create collection center</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Info</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select an address in map</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={selectedState}
                onChange={handleSelectState}
              >
                <option value="0">Select...</option>
                {stateInitials.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Select...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Recyclable Items</h2>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateCollectCenter;

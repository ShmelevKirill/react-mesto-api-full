import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import DeleteCardPopup from "./DeleteCardPopup"
import EditAvatarPopup from "./EditAvatarPopup"
import EditProfilePopup from "./EditProfilePopup"
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import error from "../images/error.svg";
import success from "../images/success.svg";
import "../index.css";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltipStatus, setInfoTooltipStatus] = useState({
    image: "",
    title: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
      api
        .getInitialCards()
        .then((res) => {
         setCards(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setIsDeleteCardPopupOpen(true);
    setDeleteCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    setDeleteCard({});
    setIsLoad(false);
  }

  function setStateCards(card, newCard) {
    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setStateCards(card, newCard);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setStateCards(card, newCard);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDeleteId(card) {
    setIsLoad(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoad(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoad(true);
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoad(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoad(true);
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoad(false);
      });
  }

  function handleAddPlace({ name, link }) {
    setIsLoad(true);
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoad(false);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoTooltipStatus({
          image: success,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        setInfoTooltipStatus({
          image: error,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      })
      .finally(handleInfoTooltip);
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus({
          image: error,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={email} loggedIn={loggedIn} onSignOut={signOut} />
        <Routes>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          </Routes>
          {loggedIn ? <Footer /> : <></>}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoad={isLoad}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDeleteId}
          isLoad={isLoad}
          card={deleteCard}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          image={infoTooltipStatus.image}
          title={infoTooltipStatus.title}
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
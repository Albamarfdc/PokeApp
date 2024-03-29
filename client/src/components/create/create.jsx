import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, getPokemons, getTypes } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loader from "../assets/Loader2.gif";
import Back from "../assets/back.png";
import "./create.css";

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokemons, types } = useSelector((state) => state);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
    img: "",
  });

  const resetInput = () => {
    setInput({
      name: "",
      img: "",
      hp: "0",
      attack: "0",
      defense: "0",
      speed: "0",
      height: "0",
      weight: "0",
      types: [],
    });
  };

  let validateName = /^[a-z]+$/;
  const validUrl = /^(ftp|http|https):\/\/[^ "]+\.\S+$/;
  //const validNum = /^\d+$/;
  //const urlValid= !/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/

  const validate = (input) => {
    let errors = {};
    if (
      !input.name ||
      !validateName.test(input.name) ||
      input.name.length < 3 ||
      input.name.length > 20

    ) {
      errors.name = "Special characters, numbers or name longer than 20 characters are not allowed";
    }
    if (!validUrl.test(input.img) && input.img) {
      errors.img = "Image field must have a valid URL or be empty.";
    }
    if (pokemons.find((p) => p.name === input.name)) {
      errors.name = "This pokemon already exists!";
    }

    /*  /* !validNum.test(input.hp) ||
    parseInt(input.hp) < 5 ||
    parseInt(input.hp) > 255
  ) 
  error.hp = "HP must be a number between 5 and 255.";*/
    if (!input.hp || input.hp < 1) {
      errors.hp = "Must be a number between 1-255";
    }
    if (!input.attack || input.attack < 1) {
      errors.attack = " Must be a number between 1-200";
    }
    if (!input.defense || input.defense < 1) {
      errors.defense = "Must be a number between 1-250";
    }
    if (!input.speed || input.speed < 1) {
      errors.speed = "Must be a number between 1-200";
    }
    if (!input.height || input.height < 1) {
      errors.height = "Must be a number between 1-1000";
    }
    if (!input.weight || input.weight < 1) {
      errors.weight = "Must be a number between 1-2000";
    }


    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      pokemons.some((e) => e.name.toLowerCase() === input.name.toLowerCase())
    ) {
      alert("That name already exists!");
    } else if (
      !Object.keys(errors).length &&
      input.name.length &&
      input.types.length > 0 &&
      input.types.length <= 2
    ) {
      dispatch(addPokemon(input));
      resetInput();
      alert("Pokémon created succesfully!");
      navigate("/home");
    } else alert("Please, check the form!");
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value.toLowerCase(),
      })
    );
  };

  const handleSelect = (e) => {
    if (!input.types.includes(e.target.value) && input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      e.target.value = "Select type";
    } else {
      alert("It can't repeat or select more than 2 types");
    }
  };

  const handleDelete = (type) => {
    setInput({
      ...input,
      types: input.types.filter((e) => e !== type),
    });
    setErrors(
      validate({
        ...input,
        types: input.types.filter((e) => e !== type),
      })
    );
  };

  return (
    <>
      <div>
        <Link to="/home">
          <img className={"back"} src={Back} alt="Home" width="80px" />
        </Link>
      </div>
      {pokemons.length === 0 ? (
        <img
          className={"oader"}
          src={Loader}
          alt="Loading..."
          width="350px"
          height="350px"
        />
      ) : (
        <div className={"form"}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className={"title"}>Create a Pokémon!</h2>
            <div>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  value={input.name.toLowerCase()}
                  name="name"
                  id="name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Name..."
                  className={"fields"}
                />
                <p>{errors.name}</p>
                <label htmlFor="img">Image: </label>
                <input
                  type="text"
                  value={input.img}
                  name="img"
                  id="img"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Url Optional..."
                  className={"fields"}
                />
                <p> </p>
                <label htmlFor="hp">HP:</label>
                <input
                  type="range"
                  value={input.hp}
                  name="hp"
                  id="hp"
                  min="0"
                  max="255"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" HP..."
                  className={"fields"}
                />
                {input.hp}
                <p>{errors.hp}</p>
                <label htmlFor="attack">Attack:</label>
                <input
                  type="range"
                  value={input.attack}
                  name="attack"
                  id="attack"
                  min="0"
                  max="200"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Attack..."
                  className={"fields"}
                />
                {input.attack}
                <p>{errors.attack}</p>
                <label htmlFor="defense">Defense:</label>
                <input
                  type="range"
                  value={input.defense}
                  name="defense"
                  id="defense"
                  min="0"
                  max="250"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Defense..."
                  className={"fields"}
                />
                {input.defense}
                <p>{errors.defense}</p>
              </div>
              <div>
                <label htmlFor="speed">Speed:</label>
                <input
                  type="range"
                  value={input.speed}
                  name="speed"
                  id="speed"
                  min="0"
                  max="200"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Speed..."
                  className={"fields"}
                />
                {input.speed}
                <p>{errors.speed}</p>

                <label htmlFor="height">Height:</label>
                <input
                  type="range"
                  value={input.height}
                  name="height"
                  id="height"
                  min="0"
                  max="1000"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Height..."
                  className={"fields"}
                />
                {input.height}
                <p>{errors.height}</p>
                <label htmlFor="weight">Weight:</label>
                <input
                  type="range"
                  value={input.weight}
                  name="weight"
                  id="weight"
                  min="0"
                  max="2000"
                  step="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=" Weight..."
                  className={"fields"}
                />
                {input.weight}
                <p>{errors.weight}</p>
              </div>
            </div>
            <div>
              <select
                onChange={(e) => {
                  handleSelect(e);
                }}
                className={"selector"}
              >
                <option>Select type</option>
                {types?.map((e) => {
                  return (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <p>{errors.types}</p>
              {
                input.types.map((e) => {
                  return (
                    <div key={e}>
                      <span>{e} </span>
                      {""}
                      <button
                        onClick={() => {
                          handleDelete(e);
                        }}
                        className={"btn"}
                      >
                        {""}x{""}
                      </button>
                    </div>
                  );
                }) //para poder ver que fui seleccionando
              }
            </div>
            <button type="submit" className={"btn"}>
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
}
export default Create;

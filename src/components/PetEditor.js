import { useEffect, useState } from 'react';
//allows us to get that id in the url
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import InputField from './InputField';
import DropDownField from './DropDownField';
import jwt from 'jsonwebtoken';

function PetEditor({ auth, showError, showSuccess }) {
  const { petId } = useParams();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState('');

  function onClickSubmit(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');

    axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { name, gender, species, age },
    })
    .then((res) => {
      showSuccess(res.data.message)
      console.log(res.data)
    })
    .catch((err) => {
      showError(err.message)
      console.log(err)
    }) 
  }


  useEffect(() => {
    setPending(true);
    axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setSuccess(res.data.message);
        setPending(false);
        setLoaded(true);
        console.log(res.data);
        setGender(res.data.gender);
        setName(res.data.name);
        setSpecies(res.data.species);
        setAge(res.data.age);
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, petId, showError]);

  // updatePet(() => {
  // axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
  //   method: 'post',
  //   headers: {
  //     authorization: `Bearer ${auth?.token}`
  //   },
  //   data: { name: pet.name, gender: pet.gender, species: pet.species, age: pet.age  },
  // })
  //   .then((res) => {
  //     setSuccess(res.data.message);
  //     const authPayload = jwt.decode(res.data.token);
  //     const auth = {
  //       name: res.data.name,
  //       gender: res.data.gender,
  //       species: res.data.species,
  //       age:res.data.age,
  //       token: res.data.token,
  //       payload: authPayload,
  //     };
  //     onLogin(auth);
  //   })
  //   .catch((err) => {
  //     const resError = err?.response?.data?.error;
  //     if (resError) {
  //       if (typeof resError === 'string') {
  //         setError(resError);
  //         showError(resError);
  //       } else if (resError.details) {
  //         setError(_.map(resError.details, (x) => <div>{x.message}</div>));
  //       } else {
  //         setError(JSON.stringify(resError));
  //       }
  //     } else {
  //       setError(err.message);
  //       showError(err.message);
  //     }
  //   });
  // })

  return (
    <div>
      <h1>Pet Editor</h1>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="card border-dark mb-2">
        <div className="card-body">
          <div className="card-text">
            {loaded && (
              <form>
                <InputField
                  value={name}
                  label="Name"
                  id="PetEditor-name"
                  onChange={(evt) => setName(evt.currentTarget.value)}
                />
                <DropDownField
                  value={gender}
                  label="Gender"
                  id="PetEditor-gender"
                  onChange={(evt) => setGender(evt.currentTarget.value)}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </DropDownField>
                <InputField
                  value={species}
                  label="Species"
                  id="PetEditor-species"
                  onChange={(evt) => setSpecies(evt.currentTarget.value)}
                />
                <InputField
                  value={age}
                  label="Age"
                  id="PetEditor-age"
                  onChange={(evt) => setAge(evt.currentTarget.value)}
                />
              </form>
            )}
          </div>
        </div>
      </div>
      <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
        Submit Changes
      </button>
    </div>
  );
}

export default PetEditor;

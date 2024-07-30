import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: handle progress updates here
          },
          (error) => {
            toast.error(error.message);
            setLoading(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
              userRole: role
            });

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
              userRole: role
            });

            setLoading(false);
            toast.success('Account created');
            navigate('/login');
          }
        );
      } else {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email,
          photoURL: null, // or a default URL if you have one
          userRole: role
        });

        setLoading(false);
        toast.success('Account created');
        navigate('/login');
      }

    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className='auth__form' onSubmit={signup}>
                <FormGroup className='form__group'>
                  <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                <select value={role} onChange={(e)=>setRole(e.target.value)}>
                  <option>Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                </FormGroup>
                

                <FormGroup className='form__group'>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button className="buy__btn auth__btn" type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create an Account'}
                </button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;

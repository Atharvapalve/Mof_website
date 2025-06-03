import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #00a8cc 0%, #006994 100%);
  position: relative;
  overflow: hidden;
`;

const Fish = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size / 2}px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50% 0 0 50%;
  transform: rotate(45deg);
  &::before {
    content: '';
    position: absolute;
    top: 75%;
    left: 80%;
    width: 30%;
    height: 30%;
    background: inherit;
    border-radius: 50%;
    transform: rotate(-45deg);
  }
`;

const SignUpCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 1;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: #003366;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #002347;
  }
`;

const LinkText = styled.p`
  color: white;
  margin-top: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: white;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  min-width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #00a8cc;
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  a {
    color: #00a8cc;
    text-decoration: underline;
    
    &:hover {
      color: #0089a7;
    }
  }
`;

const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const navigate = useNavigate();

  const fishVariants = {
    animate: (i: number) => ({
      x: [-100, window.innerWidth + 100],
      y: [0, Math.sin(i) * 50],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: 'linear',
        y: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          yoyo: true
        }
      },
    }),
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    if (!agreeToTerms) {
      setShowTermsError(true);
      return;
    }
    setShowTermsError(false);
    console.log('Sign up clicked', { email, password, username, receiveEmails, agreeToTerms });
  };

  return (
    <SignUpContainer>
      {[...Array(8)].map((_, i) => (
        <Fish
          key={i}
          size={Math.random() * 30 + 20}
          initial={{ x: -100, y: 0 }}
          animate="animate"
          custom={i}
          variants={fishVariants}
          style={{
            top: `${(i + 1) * 12}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
      <SignUpCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Explore with us!</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="receiveEmails"
            checked={receiveEmails}
            onChange={(e) => setReceiveEmails(e.target.checked)}
          />
          <CheckboxLabel htmlFor="receiveEmails">
            Receive emails about updates and special offers
          </CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={(e) => {
              setAgreeToTerms(e.target.checked);
              if (e.target.checked) setShowTermsError(false);
            }}
          />
          <CheckboxLabel htmlFor="agreeToTerms">
            I agree to the <a href="#terms">Terms & Conditions</a> & <a href="#privacy">Privacy Policy</a>
          </CheckboxLabel>
        </CheckboxContainer>
        {showTermsError && (
          <ErrorText>Please agree to the Terms & Conditions to continue</ErrorText>
        )}
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <LinkText onClick={handleSignInClick}>
          Already have an account? Sign In
        </LinkText>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUp; 
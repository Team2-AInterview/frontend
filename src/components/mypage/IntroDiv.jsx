import styled from "styled-components";

const IntroInput = ({ type, handleInput, value }) => {
  return (
    <>
      <Box1 type="text" onChange={handleInput} value={value} />
      <Box2 type="text" onChange={handleInput} value={value} />
      <Box3 type="text" onChange={handleInput} value={value} />
      <Box4 type="text" onChange={handleInput} value={value} />
    </>
  );
};

export default IntroInput;

const Box1 = styled.textarea`
  position: absolute;
  background-color: #d9d9d9;
  width: 306px;
  height: 100px;
  margin-left: 15px;
  margin-top: 43px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  border: none;
  text-align: left;

  &:focus {
    border: 1px solid;
    border-color: #3a00f9; /* 포커스 시 보라색 */
  }
`;

const Box2 = styled.textarea`
  position: absolute;
  background-color: #d9d9d9;
  width: 306px;
  height: 100px;
  margin-left: 15px;
  margin-top: 189px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  border: none;
  text-align: left;

  &:focus {
    border: 1px solid;
    border-color: #3a00f9; /* 포커스 시 보라색 */
  }
`;

const Box3 = styled.textarea`
  position: absolute;
  background-color: #d9d9d9;
  width: 306px;
  height: 100px;
  margin-left: 15px;
  margin-top: 343px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  border: none;
  text-align: left;

  &:focus {
    border: 1px solid;
    border-color: #3a00f9; /* 포커스 시 보라색 */
  }
`;

const Box4 = styled.textarea`
  position: absolute;
  background-color: #d9d9d9;
  width: 306px;
  height: 100px;
  margin-left: 15px;
  margin-top: 482px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  border: none;
  text-align: left;

  &:focus {
    border: 1px solid;
    border-color: #3a00f9; /* 포커스 시 보라색 */
  }
`;

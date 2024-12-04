import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeIcon,Q_StorageIcon,FaceIdIcon,PersonIcon } from "../img/navIcon";
import { useAuth } from "../AuthContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
`;

const NavLink = styled(Link)`
color: ${(props) => (props.active ? "#3A00F9" : "#000")};
  font-size: 1.5rem;
  text-align: center;
  flex: 1;
  transition: color 0.3s;

  &:hover {
    color: #3A00F9; 
  }
`;

const NavItem = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    font-size:11px;
`;

const IconWrapper = styled.div`
  margin-bottom: 4px; 
`;

const Navbar = () => {
    const [activeNav, setActiveNav] = useState(1);
    const { isLoggedIn } = useAuth(); //로그인 상태 가져옴
    const navigate = useNavigate();

    const navItems = [
        { id:1, name: "홈", icon: HomeIcon, to: "/main" },
        { id:2, name: "예상 질문", icon: Q_StorageIcon, to: "/interviewquestion" },
        { id:3, name: "모의 면접", icon: FaceIdIcon, to: "/interview" },
        { id:4, name: "마이페이지", icon: PersonIcon, to: "/mypage" },     
    ];

    const handleNavigation = ( id, to) => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            setActiveNav(id);
            navigate(to);
        }
    };

    return (
        <Wrapper>
            {navItems.map((item) => (
                <NavLink
                    key={item.id}
                    active={activeNav === item.id}
                    onClick={() => handleNavigation(item.id, item.to)}
                >
                    <NavItem>
                        <IconWrapper><item.icon size="25px" /></IconWrapper>
                        <span>{ item.name}</span>  
                    </NavItem>
                </NavLink>
            ))}
        </Wrapper>

    );
};

export default Navbar;


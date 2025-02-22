import { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import SaledProductCard from "./SaledProductCard";
import PostList from "../../../components/postView/PostList";
import useAuth from "../../../hook/useAuth";
import TopBar from "../../../components/topbar/TopBar";
import NavBar from "../../../components/navBar/NavBar";
import OptionModal from "../../../components/optionModal/OptionModal";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import Topbtn from "../../../components/button/Topbtn";

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #f2f2f2;
    @media screen and (min-width: 768px) {
        margin-left: 240px;
    }
    @media screen and (max-width: 768px) {
        margin-bottom: 60px;
    }
`;

export const UserNameContext = createContext();

export default function Profile() {
    const [accoutName, setAccountName] = useState();
    const [isMyProfile, setIsMyProfile] = useState();
    const accountNameInURL = useParams().username;
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const data = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        data && setAccountName(data.accountname);
    }, [data]);

    useEffect(() => {
        if (accoutName && !isMyProfile) {
            if (accoutName === accountNameInURL) {
                setIsMyProfile(true);
            } else {
                setIsMyProfile(false);
            }
        }
    }, [accoutName, accountNameInURL, isMyProfile]);

    const onConfirm = () => {
        setOptionModalVisible(false);
    };

    const optionLogoutHandle = () => {
        setOptionModalVisible(false);
        setConfirmModalVisible(true);
    };

    const logOutFunc = () => {
        if (localStorage.getItem("Authorization")) {
            localStorage.removeItem("Authorization");
            navigate("../../../");
            console.log("로그아웃");
        } else {
            alert("로그아웃된 상태입니다!");
        }
    };

    return (
        <UserNameContext.Provider
            value={{ username: accountNameInURL, isMyProfile: isMyProfile }}
        >
            {optionModalVisible && (
                <OptionModal onConfirm={onConfirm}>
                    <li>
                        <Link to={`/account/profile/${accoutName}/edit`}>
                            설정 및 개인정보
                        </Link>
                    </li>
                    <li>
                        <button type="button" onClick={optionLogoutHandle}>
                            로그아웃
                        </button>
                    </li>
                </OptionModal>
            )}
            {confirmModalVisible && (
                <ConfirmModal
                    confirmMsg={"로그아웃하시겠어요?"}
                    onCancle={() => setConfirmModalVisible(false)}
                    onConfirm={() => setConfirmModalVisible(false)}
                    buttonRight={
                        <button type={"button"} onClick={logOutFunc}>
                            로그아웃
                        </button>
                    }
                />
            )}
            <TopBar
                type="A1"
                onClickModal={() => setOptionModalVisible(true)}
            />
            <Cont>
                <ProfileCard />
                <SaledProductCard />
                <PostList isProfilePage={true} />

                <Topbtn />
            </Cont>
            <NavBar />
        </UserNameContext.Provider>
    );
}

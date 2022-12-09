import styled from "styled-components";

const ButtonFollow = styled.button`
    background-color: ${(props) => (props.type === 'follow'? '#F26E22' : '#fff')};
    color: ${(props) => (props.type === 'follow'? '#fff' : '#767676')};
    border: ${(props) => (props.type === 'follow'? 'none' : '1px solid #DBDBDB;')};

    &.ms {
        border-radius: 30px;
        cursor: pointer;
        font-size: 12px;
        padding: 7px 11px;
    }
    &.large {
        border-radius: 30px;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 40px;
    }
`

export default ButtonFollow;
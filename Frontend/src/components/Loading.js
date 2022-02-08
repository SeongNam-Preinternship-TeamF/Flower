import { BallTriangle, TailSpin } from 'react-loader-spinner';
import styled from "styled-components";


function Loading () {

    const Load = styled.div`
        position: absolute;
        left: 40.5vw;
        top: 178.5vh;
    `;

    return(
        <Load>
            <TailSpin color="#FE5657" height={40} width={40} />
        </Load>
    );
}

    
export default Loading;
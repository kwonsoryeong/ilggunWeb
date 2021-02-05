import React from 'react';

const MessageReceived = () => {

    return (
        <div>
            <div style={styles.area}>
                <text>받은 메세지</text>
            </div>
        </div>
    );
};

export default MessageReceived;

const styles={
    area:{
        width:'80vw',
    }
}
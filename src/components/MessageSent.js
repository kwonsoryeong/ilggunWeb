import React from 'react';

const MessageSent = () => {

    return (
        <div>
            <div style={styles.area}>
                <text>보낸 메세지</text>
            </div>
        </div>
    );
};

export default MessageSent;

const styles={
    area:{
        width:'80vw',
    }
}
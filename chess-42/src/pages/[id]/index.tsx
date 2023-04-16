
import React from "react";
import axios from "axios";
const Profile : React.FC = (props) => {

    return(
        <>
        {
            Object.values(props.data).map((users)=> <p key={users.name}>{users.username}</p>)
        }
        </>
    );

};

export async function getServerSideProps() {
    // Fetch data from an API or database
    const response = await axios('https://chess-828a9-default-rtdb.firebaseio.com/.json');
    const data = await response.data;

    // Return the fetched data as props
    return { props: { data } };
}
export default Profile
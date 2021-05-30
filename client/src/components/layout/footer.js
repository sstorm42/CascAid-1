import React from 'react';
import moment from 'moment';

const Footer = (props) => {
    const lastBuild = new Date('Sat May 08 2021 05:13:39 GMT+0600 (Bangladesh Standard Time)');
    return (
        <div className="footer">
            <h6>
                Thank you for staying with us. <b>Server Last Updated At: </b>
                {moment(lastBuild).format('LLLL')}
            </h6>
            {/* <label>
                <b>Server Last Updated At: </b>
                {moment(lastBuild).format('LLLL')}
            </label> */}
        </div>
    );
};
export default Footer;

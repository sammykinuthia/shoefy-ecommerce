import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../Config/dbConfig.js'
import { sendMail } from '../Helpers/email.js'
dotenv.config()

export const SendPasswordResetCode = async () => {
    const pool = await mssql.connect(sqlConfig);
    if (pool.connected) {
        console.log("..");
        const users = await (await pool.request().execute("uspGetUser")).recordset;
        for (let user of users) {
            const pin = generatePIN();
            
            ejs.renderFile('./Templates/forgotpassword.ejs', { username: user.username, pin }, async (error, html) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const message = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Password Reset Code",
                    html
                };
                try {
                    await sendMail(message);
                    await pool.request().input("id", user.id).input("pin", pin).execute("uspMarkUserPasswordResetSent");

                } catch (error) {
                    console.log(error);
                }
            });
        }
    } else {
        console.log("Failed to connect to the database");
    }
};

// Generate a 4-digit PIN
function generatePIN() {
    return Math.floor(1000 + Math.random() * 9000);
}


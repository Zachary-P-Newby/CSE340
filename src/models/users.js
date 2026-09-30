import db from "./db.js"


const createUser = async (name, email, password_hash) =>{
    const default_role = 'user';
    const query = `INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) RETURNING user_id`;
    const queryParams = [name, email, password_hash, default_role]

    const result = await db.query(query,queryParams);

    if(result.rows.length ===  0){
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user

}

const findUserByEmail = async (email) =>{
    const query = `
        SELECT user_id, name, email, password_hash, role_id
        FROM users
        WHERE email = $1
    `;

    const queryParams = [email];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // user not found
    }

    return result.rows[0];
};

const verifyPassword = async (password, password_hash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (inputEmail, password)=>{
    const {user_id, name, email, password_hash, role_id} = findUserByEmail(inputEmail);
    
    if(userData == null){
        return userData
    }
    else{
        const isCorrect = verifyPassword(password, password_hash);

        if (isCorrect){
            return {user_id, name, email, role_id};
        }
        else{
            return null;
        }
    }
}



export {createUser, authenticateUser};
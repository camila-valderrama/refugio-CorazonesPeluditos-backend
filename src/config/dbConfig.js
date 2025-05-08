import mongoose from 'mongoose';

export async function connectDB() {
    try{
        mongoose.connect(
        `mongodb+srv://camival00:ZP0AZp7nqwZefgOV@cluster0.ffelgka.mongodb.net/refugio_db`, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Conexión exitosa a MongoDB');
        

    } catch (error) {
        console.log('Error al conectar a MongoDB:', error);

        process.exit(1);
        
    }
}


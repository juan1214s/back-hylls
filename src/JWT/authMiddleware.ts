// middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'HyllsProyec2024';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Verifica si existe el token en el header de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado.' });
  }

  // Extrae el token de la cabecera (formato: Bearer <token>)
  const token = authHeader.split(' ')[1];

  try {
    // Verifica el token JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    // Adjunta el usuario decodificado al objeto de solicitud para uso posterior
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

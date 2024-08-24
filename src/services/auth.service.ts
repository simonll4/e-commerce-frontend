// import { AuthRepository } from "../domain/repository/auth/auth.repository";

// export class AuthService {
//   constructor(private readonly authRepository: AuthRepository) {}

//   public signInWithEmailAndPassword(email: string, password: string) {
//     return this.authRepository.signInEmailAndPassword(email, password);
//   }

//   public registerUserWithEmailAndPassword(email: string, password: string) {
//     return this.authRepository.registerUserWithEmailAndPassword(
//       email,
//       password
//     );
//   }

//   public logout() {
//     return this.authRepository.logout ;
//   }
// }


import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from "firebase/auth";

export const login = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
  return signOut(auth);
};





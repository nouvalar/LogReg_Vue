import { defineStore } from 'pinia';

import { fetchWrapper } from '../helpers';
import { router } from '../router';

import { useAlertStore } from './alert.store';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // Inisialisasi status dari penyimpanan lokal untuk memungkinkan pengguna tetap masuk
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    

                // update pinia state
                this.user = user;

                // Simpan detail pengguna dan JWT di penyimpanan lokal untuk membuat pengguna tetap masuk di antara penyegaran halaman
                localStorage.setItem('user', JSON.stringify(user));

                // Alihkan ke URL sebelumnya atau default ke halaman beranda
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error || 'Login Failed');                
            }
        },
        logout() {

            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});

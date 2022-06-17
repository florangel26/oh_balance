<template>
    <div class= "login">
        <h1 class="text-center">Ingresa tus datos para acceder</h1>
        <v-form v-model="valid" ref="formRegister">
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    />
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        :rules="passwordRules"
                    />
                    <v-btn
                       color="blue darken-1"
                        rounded
                        class="mr-2"
                        :disabled="!valid"
                        >Acceder</v-btn
                    >
                    <v-btn color="teal accent-3" normal dark rounded >Borrar</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false, 
            user: {
                email: "",
                password: "",
            },
            emailRules: [
                (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
                (v) => !!v || "No existe",
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    "Formato de email incorrecto",
            ],
            passwordRules: [
                (v) => !!v || "No existe",
                (v) => (v && v.length > 5) || "Debe ser sobre 6 carácteres",
            ],
        };
    },

};
</script>
<style>
.login{
    margin-top: 30px;
}
    
</style>
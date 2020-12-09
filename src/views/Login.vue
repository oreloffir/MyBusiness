<template>
    <v-card class="mx-auto justify-center"
            style="top: 50%; transform: translate(0, -50%); max-width: 344px">
        <v-card-text>
            <v-form lazy-validation ref="form" v-model="valid">
                <v-text-field
                        :rules="emailRules"
                        label="אימייל"
                        ref="email"
                        required
                        v-model="email"
                ></v-text-field>

                <v-text-field
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        label="סיסמא"
                        ref="password"
                        required
                        v-model="password"
                ></v-text-field>

            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="!valid"
                   @click="submit"
                   class="mr-4"
                   color="success"
            >התחבר
            </v-btn>
            <ul>
                <li :key="err" v-for="err in errors">{{ err }}</li>
            </ul>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        data : () => ({
            valid : true,
            email : '',
            emailRules : [
                v => !!v || 'חובה למלא אימייל',
                v => /.+@.+\..+/.test(v) || 'האימייל חייב להיות תקין',
            ],
            password : '',
            showPassword : false,
            passwordRules : [
                v => !!v || 'חובא למלא סיסמא',
                v => (v && v.length >= 6) || 'סיסמא חייבת להיות יותר מ-6 תווים',
            ],
        }),
        computed : {
            ...mapState({
                user : state => state.auth.user,
                errors : state => state.auth.errors,
            }),
        },
        methods : {
            ...mapActions({
                login : 'auth/login'
            }),
            submit() {
                if (!this.valid)
                    return;

                const data = { email : this.email, password : this.password };

                return this.login(data);
            }
        },
        mounted() {
            this.$refs.email.focus();
        }
    }
</script>

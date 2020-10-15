<template>
    <div class="notif q-gutter-sm">
        <transition
            v-for="(message, index) in notifMessages"
            :key="index"
            appear
            enter-active-class="animate__bounceIn"
            leave-active-class="animate__bounceOut"
        >
            <q-banner
                class="bg-primary text-white shadow-16"
                @click="close(index)"
            >
                {{ message }}
                <template #action>
                    <q-btn
                        flat
                        color="white"
                        label="Dismiss"
                    />
                    <q-btn
                        v-if="message.action"
                        flat
                        color="white"
                        label="Update Credit Card"
                        @click="message.action"
                    />
                </template>
            </q-banner>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NotificationMessages',

    props: {
        timeout: {
            type: Number,
            default: 10000,
        },
    },

    computed: {
        ...mapState(['notifMessages']),
    },

    methods: {
        close(key) {
            this.$store.commit('delNotificationMessage', key);
        },
    },

    watch: {
        notifMessages(newVal, val) {
            if (newVal.length >= val.length) {
                setTimeout(() => {
                    this.$store.commit('popNotificationMessage');
                }, this.timeout);
            }
        },
    },
};
</script>

<style lang="scss">
.notif {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}
</style>

<script setup lang="ts">
import router from '@/router';

const goBack = () => {
  console.log(router)
  router.go(-1);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-stone-400 dark:bg-stone-700 text-stone-400 dark:text-stone-400">
    <div class="p-6 max-w-xl bg-stone-100 dark:bg-stone-800 rounded-lg shadow-lg border border-stone-300 dark:border-stone-700 transition-all duration-500">
      <p>
        En <span class="font-bold text-stone-600 dark:text-stone-400">CodeSnap</span>, nos tomamos muy en serio tu privacidad. Creemos que la protección de
        tus datos es fundamental para construir una comunidad segura y confiable. Por eso, queremos explicarte de manera
        clara y transparente cómo recopilamos, utilizamos y protegemos tu información. Cuando te registras en <span
          class="font-bold text-stone-600 dark:text-stone-400">CodeSnap</span>, recopilamos cierta información personal, como tu nombre, dirección de correo
        electrónico, fecha de nacimiento y ubicación. Esta información nos ayuda a crear y gestionar tu cuenta, así como a
        proporcionarte una experiencia personalizada en nuestra plataforma. Además, recopilamos datos de uso, como tu
        actividad en la red social, las publicaciones que realizas, las interacciones con otros usuarios y la información
        que compartes en tu perfil. Utilizamos estos datos para mejorar nuestros servicios, personalizar tu experiencia y
        ofrecerte contenido relevante. Es importante destacar que nunca vendemos ni compartimos tu información personal
        con terceros sin tu consentimiento. Tu privacidad es nuestra prioridad y nos comprometemos a proteger tus datos de
        acuerdo con las leyes de privacidad aplicables. Siempre puedes acceder, corregir o eliminar tus datos personales
        en tu perfil de usuario. Además, puedes ajustar la configuración de privacidad para controlar quién puede ver tu
        información y qué contenido compartes públicamente. En resumen, en <span class="font-bold text-stone-600 dark:text-stone-400">CodeSnap</span> nos
        comprometemos a proteger tu privacidad y a proporcionarte una experiencia segura y satisfactoria en nuestra
        plataforma. Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad, no dudes en ponerte en
        contacto con nuestro equipo de soporte.
      </p>
    </div>
    <div class="mt-8">
      <button @click="goBack"
        class="px-6 py-3 bg-stone-500 dark:bg-stone-800 text-stone-50 dark:text-stone-200 rounded-full shadow-lg hover:bg-stone-500 dark:hover:bg-stone-600 transform hover:scale-105 transition-transform duration-300">
        Atrás
      </button>
    </div>
  </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { authStore } from '@/stores/Auth.Stores'
import type { Login } from '@/types/Auth.Types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const auth = authStore()
const router = useRouter()

const data = ref<Login>({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

const loginData = async () => {
  errorMessage.value = null
  loading.value = true

  try {
    await auth.login(data.value)
    router.push('/dashboard')
  } catch (err: any) {
    errorMessage.value =
      err?.response?.data?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <!-- Removed vertical centering -->
  <div class="min-h-screen bg-muted/40 px-4 pt-20">
    <div class="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent class="space-y-4">
          <form @submit.prevent="loginData" class="space-y-4">

            <div v-if="errorMessage" class="text-sm text-destructive">
              {{ errorMessage }}
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                v-model="data.email"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                v-model="data.password"
                required
              />
            </div>

            <Button
              type="submit"
              class="w-full"
              :disabled="loading"
            >
              {{ loading ? 'Signing in...' : 'Login' }}
            </Button>

          </form>

          <div class="text-center text-sm text-muted-foreground">
            Don’t have an account?
            <span
              @click="goToRegister"
              class="cursor-pointer underline underline-offset-4 hover:text-primary"
            >
              Register
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
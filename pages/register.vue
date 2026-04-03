<template>
  <div class="login-page">
    <div class="logo">📖</div>
    <h1>注册账号</h1>
    <div class="form">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" @keyup.enter="handleRegister" />
      <input v-model="confirmPassword" type="password" placeholder="确认密码" @keyup.enter="handleRegister" />
      <button @click="handleRegister" :disabled="loading">
        {{ loading ? '注册中...' : '注册' }}
      </button>
      <p class="switch">
        已有账号？<span @click="navigateTo('/login')">立即登录</span>
      </p>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = '两次密码不一致'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const res = await $fetch('/api/register', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    
    if (res.success) {
      alert('注册成功，请登录')
      navigateTo('/login')
    }
  } catch (e) {
    error.value = e.data?.message || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
.login-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }
.logo { font-size: 60px; margin-bottom: 20px; }
h1 { margin-bottom: 30px; color: #333; }
.form { width: 100%; max-width: 300px; }
.form input { width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; }
.form button { width: 100%; padding: 12px; background: #4a90d9; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
.form button:disabled { opacity: 0.6; }
.form button:active { background: #3a7bc8; }
.switch { margin-top: 20px; text-align: center; color: #666; font-size: 14px; }
.switch span { color: #4a90d9; cursor: pointer; }
.error { color: #e74c3c; margin-top: 15px; font-size: 14px; }
</style>
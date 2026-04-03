<template>
  <div class="login-page">
    <div class="logo">📚</div>
    <h1>小说阅读</h1>
    <div class="form">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" @keyup.enter="handleLogin" />
      <button @click="handleLogin" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <p class="switch">
        还没有账号？<span @click="navigateTo('/register')">立即注册</span>
      </p>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    
    if (res.success) {
      // 保存 token 到 localStorage
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigateTo('/')
    }
  } catch (e) {
    error.value = e.data?.message || '登录失败'
  } finally {
    loading.value = false
  }
}

// 检查是否已登录
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    navigateTo('/')
  }
})
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
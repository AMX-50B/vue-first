<script setup lang="ts">
import { computed } from 'vue';
import { RouterView,RouterLink,useRoute } from 'vue-router';

const route = useRoute()

const navigation = [
  { name: '概览', description: '学习数据总览',path:'/home' },
  { name: '管理', description: '管理识字内容',path:'/manage' },
  { name: '识字', description: '识字页',path:'/show' }
]

const activePage = computed(() => {
  return navigation.find((item) => item.path === route.path)?.name ?? '概览'
})

</script>

<template>
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">AN</span>
        <span>测试</span>
      </div>

      <nav class="navigation" aria-label="主导航">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          :class="{ active: route.path === item.path }">
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <span class="status-dot" aria-hidden="true"></span>
        系统运行正常
      </div>
    </aside>

    <section class="workspace">
      <header class="topbar">
        <div>
          <p class="eyebrow">内容管理</p>
          <h1>{{ activePage }}</h1>
        </div>
        <div class="account">
          <span class="account-avatar">刘</span>
          <div>
            <strong>刘老师</strong>
            <small>管理员</small>
          </div>
        </div>
      </header>

      <main class="display-area">
        <RouterView></RouterView>
      </main>
    </section>
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #f5f7f6;
  color: #1c2420;
  font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}

:global(button) {
  font: inherit;
}

.admin-shell {
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 15.5rem minmax(0, 1fr);
}

.sidebar {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: 1.5rem 1rem;
  background: #202b27;
  color: #e9efeb;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0 0.6rem;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
}

.brand-mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 6px;
  background: #a6df58;
  color: #172116;
  font-weight: 800;
}

.navigation {
  display: grid;
  gap: 0.35rem;
  margin-top: 3rem;
}

.navigation :deep(a) {
  display: block;
  width: 100%;
  border: 0;
  border-radius: 5px;
  padding: 0.75rem 0.85rem;
  background: transparent;
  color: #c8d1cb;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.navigation :deep(a:hover),
.navigation :deep(a.active) {
  background: #34433c;
  color: #ffffff;
}

.navigation :deep(a.active) {
  box-shadow: inset 3px 0 0 #a6df58;
}

.navigation :deep(a:focus-visible),
.text-button:focus-visible {
  outline: 3px solid #a6df58;
  outline-offset: 2px;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: auto;
  padding: 0.75rem 0.6rem 0;
  border-top: 1px solid #3d4a44;
  color: #aebbb2;
  font-size: 0.8rem;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #a6df58;
}

.workspace {
  min-width: 0;
}

.topbar {
  display: flex;
  min-height: 5.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1.25rem, 4vw, 3.25rem);
  border-bottom: 1px solid #dce3df;
  background: #ffffff;
}

.eyebrow {
  margin: 0 0 0.25rem;
  color: #68756e;
  font-size: 0.75rem;
  font-weight: 700;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: 1.45rem;
  line-height: 1.2;
}

.account {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #26332d;
  font-size: 0.85rem;
}

.account-avatar,
.learner-avatar {
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #d9eee7;
  color: #1d5b4a;
  font-weight: 800;
}

.account-avatar {
  width: 2.3rem;
  height: 2.3rem;
}

.account strong,
.account small {
  display: block;
}

.account small {
  margin-top: 0.2rem;
  color: #78847e;
}

.display-area {
  width: min(100%, 84rem);
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.page-intro,
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.page-intro h2,
.section-heading h2,
.review-section h2 {
  margin-bottom: 0.35rem;
  font-size: 1.1rem;
}

.page-intro p,
.section-heading p,
.review-section > p {
  margin-bottom: 0;
  color: #718078;
  font-size: 0.9rem;
}

.date-label {
  flex: 0 0 auto;
  color: #718078;
  font-size: 0.85rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.summary-item {
  min-height: 10rem;
  border: 1px solid #dce3df;
  border-radius: 6px;
  padding: 1.25rem;
  background: #ffffff;
}

.summary-item p {
  margin-bottom: 1.25rem;
  color: #68756e;
  font-size: 0.9rem;
}

.summary-item strong {
  display: block;
  font-size: 2rem;
  line-height: 1;
}

.summary-item span {
  display: block;
  margin-top: 0.85rem;
  color: #4a6257;
  font-size: 0.8rem;
}

.summary-item.blue span {
  color: #396582;
}

.summary-item.orange span {
  color: #9a5a26;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(15rem, 0.7fr);
  gap: 2rem;
  margin-top: 2.75rem;
}

.text-button {
  border: 0;
  padding: 0.25rem 0;
  background: transparent;
  color: #2c6d58;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

.learning-list {
  margin-top: 1.1rem;
  border-top: 1px solid #dce3df;
}

.learning-row {
  display: grid;
  grid-template-columns: 2.3rem minmax(0, 1fr) 2.5rem 3.25rem;
  align-items: center;
  gap: 0.8rem;
  min-height: 4.4rem;
  border-bottom: 1px solid #dce3df;
}

.learner-avatar {
  width: 2.1rem;
  height: 2.1rem;
  font-size: 0.85rem;
}

.learner-info strong,
.learner-info span {
  display: block;
}

.learner-info strong {
  font-size: 0.9rem;
}

.learner-info span,
.learning-row time {
  margin-top: 0.2rem;
  color: #77847d;
  font-size: 0.78rem;
}

.learning-row time {
  text-align: right;
}

.learned-word {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border: 1px solid #bcd3ca;
  border-radius: 4px;
  background: #eef7f2;
  color: #245e4e;
  font-size: 1.2rem;
  font-weight: 800;
}

.review-section {
  align-self: start;
  border-left: 3px solid #a6df58;
  padding: 0.2rem 0 0.2rem 1.25rem;
}

.review-count {
  margin: 1.5rem 0 0.2rem !important;
  color: #1c2420 !important;
  font-size: 3rem !important;
  font-weight: 800;
  line-height: 1;
}

.review-progress {
  height: 0.5rem;
  margin-top: 1.5rem;
  overflow: hidden;
  border-radius: 3px;
  background: #dbe4df;
}

.review-progress span {
  display: block;
  width: 68%;
  height: 100%;
  background: #5f9f7a;
}

.progress-caption {
  margin-top: 0.55rem !important;
}

@media (max-width: 800px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    min-height: auto;
    padding: 1rem;
  }

  .navigation {
    display: flex;
    margin-top: 1rem;
    overflow-x: auto;
  }

  .navigation :deep(a) {
    width: auto;
    flex: 0 0 auto;
  }

  .sidebar-footer {
    display: none;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .review-section {
    border-top: 3px solid #a6df58;
    border-left: 0;
    padding: 1.25rem 0 0;
  }
}

@media (max-width: 560px) {
  .topbar,
  .page-intro {
    align-items: flex-start;
    flex-direction: column;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .summary-item {
    min-height: auto;
  }
}
</style>

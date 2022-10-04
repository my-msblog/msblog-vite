<template>
  <div>
    <div class="a_banner">
      <p class="a_title">{{ $t('bar.categories') }}</p>
    </div>
    <FlowCard class="categories-card">
      <h1>{{ $t('pages.article_category') }} - {{ data.category_count }}</h1>
      <ul class="category-list">
        <li
          v-for="(item, index ) in data.list"
          :key="item.categoryId"
          class="category-list-item"
          @click="saveCategory(item.category)"
        >
          <el-link
            :href="'/categories/' + item.categoryId"
            :underline="false"
            :type="handleType(index)"
          >
            {{ item.category }}
            <span class="category-count">({{ item.count }})</span>
          </el-link>
        </li>
      </ul>
    </FlowCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { getCategoryList } from '@/api/client/category';
import { CategoryVO } from '@/api/model/client/category';
export default defineComponent({
  name: 'Category',
  setup() {
    const store = useStore();
    const data = reactive({
      category_count: 0,
      list: [] as CategoryVO[],
    });
    const handleInit = function () {
      getCategoryList().then((res) =>{
        data.list = res;
        data.category_count = res.length;
      });
    };
    const handleType = (index: number) =>{
      const type = index % 4;
      switch (type){
        case 0: return 'primary';
        case 1: return 'success';
        case 2: return 'warning';
        case 3: return 'danger';
        default: return 'info';
      }
    };
    const saveCategory = (id: string) => {
      store.commit('setCategory', id);

    };
    onMounted(() => {
      handleInit();
    });
    return {
      data,
      handleType,
      saveCategory,
    };
  }
});
</script>
<style lang="scss" scoped>
.a_banner{
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background-size: cover !important;
  background: #fff url('../../../assets/background/categories.png') no-repeat center/100%;

  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 24px;
    font-weight: bold;
  }
}
.categories-card{
  margin: 48px auto 58px;
  padding: 15px 10px 10px !important;
  text-align: center;
  .category-list {
    margin: 0 1.8rem;
    list-style: none;
    text-align: left;
  }
  .category-list-item {
    padding: 8px 1.8rem 8px 0;
  }
  .category-list-item:before {
    display: inline-block;
    position: relative;
    left: -0.75rem;
    width: 7px;
    height: 7px;
    border: 0.2rem solid #49b1f5;
    border-radius: 50%;
    background: #fff;
    content: "";
    transition-duration: 0.3s;
  }
  .category-list-item:hover:before {
    border: 0.2rem solid #ff7242;
  }
  .category-list-item a:hover {
    transition: all 0.3s;

  }
  .category-list-item a:not(:hover) {
    transition: all 0.3s;
  }
  .category-count {
    margin-left: 0.5rem;
    font-size: 0.75rem;
    color: #858585;
  }
}
</style>

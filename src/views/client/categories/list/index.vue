<template>
  <div>
    <div class="a_banner">
      <p class="a_title">
        {{ $t('bar.categories') }}
        &nbsp;-&nbsp;
        {{ title }}
      </p>
    </div>
    <div class="card-list">
      <el-row :gutter="20" justify="start">
        <el-col
          v-for="(item, index) in data.articleList"
          :key="index"
          :xs="{span:19, offset: 3 }"
          :sm="{span: 12}"
          :md="{span: 10, offset:1}"
          :lg="{span: 8, offset: 0}"
        >
          <CategoryCard :item="item" :loading="data.loading" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getArticleByCategoryId } from '@/api/client/category';
import { ArticleCategoryVO } from '@/api/model/client/category';
import CategoryCard from '../components/CategoryCard.vue';

export default defineComponent({
  name: 'ArticleCategoryList',
  components: { CategoryCard },
  setup() {
    const router = useRouter();
    const store = useStore();
    const categoryId = computed(() => router.currentRoute.value.params.id as string);
    
    const title = computed(() => store.getters.getCategory);
    const data = reactive({
      articleList: [] as ArticleCategoryVO[],
      loading: true,
    });
    const handleInitCategotyList = function() {
      getArticleByCategoryId(categoryId.value).then((res) =>{
        data.articleList = res;
        data.loading = false;
      });
    };
    onMounted(() => {
      handleInitCategotyList();
    });
    return {
      data,
      title,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row{
  height: auto;
  overflow: hidden;
  .el-col{
    margin-top: 5px;
    margin-bottom: 15px;
  }
}
.a_banner{
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background: #fff url('@/assets/background/category-list.png') no-repeat center/100%;
  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 2.2rem;
    font-weight: bold;
  }
}
@media (min-width: 760px) {
  .card-list{
    max-width: 996px;
    margin: 30px auto 1rem auto;
  }
}
</style>

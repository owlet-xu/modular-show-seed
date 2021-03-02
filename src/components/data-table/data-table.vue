<template>
  <div class="data-table">
    <div class="table-title">Tabela de resultados SMS</div>
    <div class="tools-container">
      <el-button v-if="deviceType !== 'mobile'"  class="btn-sms"><i class="iconfont icon-message"></i>Enviar SMS</el-button>
      <el-button v-if="deviceType !== 'mobile'"  class="btn-group"><i class="iconfont icon-mass"></i>Mensagens EM Grupo</el-button>
    </div>
    <div class="table-container">
      <slot name="table"></slot>
    </div>
    <div class="footer-container">
      <el-pagination @current-change="handleCurrentChange" :small="deviceType === 'mobile'" :pager-count="5" :current-page.sync="pageInfo.currentPage" :total="pageInfo.total" :page-size="pageInfo.pageSize" :layout="pageLayout"></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" src="./data-table.ts"></script>
<style lang="scss" scoped src="./data-table.scss"></style>
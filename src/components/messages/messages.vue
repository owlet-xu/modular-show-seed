<template>
  <div class="messages">
    <search-form class="search-form" @search="search" @refresh="refresh" :searching="searching">
      <template v-slot:inputs>
        <p v-if="deviceType !== 'mobile'" class="title-date">Tempo</p>
        <el-date-picker v-if="deviceType !== 'mobile'" class="search-date" v-model="searchDate" type="daterange" range-separator="Fim" start-placeholde="Data de inicio" end-placeholde="Data final"></el-date-picker>
        <p v-if="deviceType !== 'mobile'" class="title-text">Tipe de negoco</p>
        <el-input v-if="deviceType !== 'mobile'" class="search-text" v-model="searchText"></el-input>
      </template>
    </search-form>
    <data-table class="data-table" @current-change="currentChange" :pageInfo="pageInfo">
      <template v-slot:table>
        <el-table height="100%" fit :data="sms" :row-class-name="tableRowClassName">
          <el-table-column align="center" width="50px">
            <template slot-scope="scope">
              {{(pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="time" label="Enviar tempo"></el-table-column>
          <el-table-column prop="phone" label="Número de telefone"></el-table-column>
          <el-table-column prop="status" label="Enviar status">
            <template slot-scope="scope">
              <div v-if="scope.row.state"><i :aria-hidden="true" class="iconfont icon-succeed"></i>Enviar com successo</div>
              <div v-else><i :aria-hidden="true" class="iconfont icon-defeated"></i>Falha no envio</div>
            </template>
          </el-table-column>
          <el-table-column prop="tip" label="Teor de SMS"></el-table-column>
          <el-table-column label="Operación" width="150px">
            <template slot-scope="scope">
              <div class="del-btn" @click="removeConfirm(scope.row.id)">
                <i :aria-hidden="true" class="iconfont icon-delete"></i>Deletar
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </data-table>
  </div>
</template>

<script lang="ts" src="./messages.ts"></script>
<style lang="scss" scoped src="./messages.scss"></style>
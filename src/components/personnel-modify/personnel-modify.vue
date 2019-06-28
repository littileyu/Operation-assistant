<template>
  <div class="personnel-modify">
    <div class="content">
      <chart-title>员工信息修改</chart-title>
      <div class="content__form">
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="人员编号">
                <span>{{form.code}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修改日期">
                <span>{{form.modifyDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="档案编号">
                <span>{{form.fileNumber}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="form.gender">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="民族">
                <el-input v-model="form.nation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="籍贯">
                <el-input v-model="form.native"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="健康状态">
                <el-input v-model="form.health"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="身份证号">
            <el-input v-model="form.idcard"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历">
                <el-input v-model="form.education"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业学校">
                <el-input v-model="form.school"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属部门">
                <el-input v-model="form.part"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务">
                <el-input v-model="form.job"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="联系地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备用电话">
                <el-input v-model="form.backnumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="紧急联系人">
                <el-input v-model="form.emergencycontact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急联系电话">
                <el-input v-model="form.emergencycall"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="到职时间">
                <el-input v-model="form.inDate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在职状态">
                <el-select v-model="form.jobstate">
                  <el-option label="在职" value="在职"></el-option>
                  <el-option label="离职" value="离职"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工资卡号">
                <el-input v-model="form.bankcard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布银行">
                <el-input v-model="form.bank"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="教育经历">
            <el-input type="textarea" v-model="form.schoolExperience"></el-input>
          </el-form-item>
          <el-form-item label="工作经历">
            <el-input type="textarea" v-model="form.workExperience"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="离职日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.leaveDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批人">
                <el-input v-model="form.approver"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="离职原因">
            <el-input type="textarea" v-model="form.leaveReason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ChartTitle from 'base/chart-title/chart-title'
import {formatDate} from 'common/js/date'

export default {
  data() {
    return {
      form: {
        code: '00002',
        modifyDate: formatDate('yyyy-MM-dd'),
        fileNumber: '00111',
        name: '李白',
        gender: '男',
        birthday: '2002-02-02',
        part: '文化',
        job: '部长',
        address: '长安',
        idcard: '234123',
        phone: '10000',
        backnumber: '12000',
        emergencycontact: '小白',
        emergencycall: '13000',
        bankcard: '123456789',
        bank: '安安',
        jobstate: '在职'
      }
    }
  },
  methods: {
    onSubmit() {}
  },
  components: {
    ChartTitle
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.content {
  max-width: 900px;
  margin: 0 auto;
  &__form {
    padding: $gutter;
    border: 1px solid $color-border;
  }
}
</style>

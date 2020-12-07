<template>
  <div>
    <el-row :gutter="24" class="card-row">
      <el-col :span="10">
        <el-card class="url-card">
          <label>api根路径：</label>
          <el-input
            type="text"
            v-model="rootUrl"
            auto-complete="off"
            placeholder="api根路径"
          >
          </el-input>
          <br />
          <br />
          <label>api子路径：</label>
          <el-input
            type="text"
            v-model="path"
            auto-complete="off"
            placeholder="api子路径"
          >
          </el-input>
          <br />
          <br />
          <label>{{ fullUrlL }}</label>
          <br />
          <br />
          <el-button class="button" type="primary" @click="getResult()"
            >GET</el-button
          >
          <el-button class="button" type="primary" @click="postResult()"
            >POST</el-button
          >
          <el-button class="button" type="primary" @click="resetToDefault()"
            >RESET</el-button
          >
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="string-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>结果json</label></span>
          </div>
          <el-divider></el-divider>
          <label>POST参数：</label>
          <el-input
            v-model="param"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            style="width: 82%"
            placeholder="JSON格式参数"
          >
          </el-input>
          <br /><br />
          <label>返回值：</label>
          <el-input
            type="textarea"
            v-model="resultString"
            :autosize="{ minRows: 3, maxRows: 10 }"
            auto-complete="off"
            style="width: 82%"
            placeholder="返回值"
          >
          </el-input>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="card-row2">
      <el-col :span="8">
        <el-card class="quill-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>富文本编辑器</label></span>
            <el-button
              class="button"
              style="margin-left: 20px"
              type="primary"
              @click="transferToQuill()"
              >Test</el-button
            >
          </div>
          <quill-editor
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            style="height: 400px"
          ></quill-editor>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="quill-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>富文本返回值</label></span>
          </div>
          <el-divider></el-divider>
          <div v-html="this.quill">{{ this.quill }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="image-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>图片url返回值</label></span>
          </div>
          <el-divider></el-divider>
          <img width="100%" height="100%" :src="imgUrl" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="card-row3">
      <el-col :span="12">
        <el-card class="token-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>token相关</label></span>
          </div>
          <el-divider></el-divider>
          <div>
            <el-input
              type="textarea"
              v-model="token"
              auto-complete="off"
              :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="token值"
            >
            </el-input>
            <el-button class="button" type="success" @click="setToken()"
              >设置token</el-button
            >
            <el-button class="button" type="danger" @click="clearToken()"
              >清空token</el-button
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="md5-card">
          <div id="announce_head">
            <img
              src="../assets/img/string.png"
              alt=""
              style="vertical-align: middle"
            />
            <span> <label>md5加密</label></span>
          </div>
          <el-divider></el-divider>
          <el-input
            type="textarea"
            v-model="md5In"
            auto-complete="off"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="原始输入"
          >
          </el-input>
          <el-button class="button" type="primary" @click="generateMd5(md5In)"
            >生成md5值</el-button
          >
          <el-input
            type="textarea"
            v-model="md5Out"
            auto-complete="off"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="md5值"
          >
          </el-input>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rootUrl: this.$api.rootUrl,
      path: "",
      result: {},
      param: "{}",
      content: "",
      editorOption: {
        placeholder: "编辑内容",
      },
      quill: "",
      imgUrl: "",
      token: "",
      md5In: "",
      md5Out: "",
    };
  },
  created() {
    let rootUrl = window.sessionStorage.getItem("rootUrl");
    if (rootUrl != null) {
      this.rootUrl = rootUrl;
    }
    let path = window.sessionStorage.getItem("path");
    if (path != null) {
      this.path = path;
    }
    let param = window.sessionStorage.getItem("param");
    if (param != null) {
      this.param = param;
    }
    let content = window.sessionStorage.getItem("content");
    if (content != null) {
      this.content = content;
    }
    let token = window.sessionStorage.getItem("token");
    if (token != null) {
      this.token = token;
    }
  },
  computed: {
    fullUrl: function () {
      return this.rootUrl + this.path;
    },
    fullUrlL: function () {
      return "完整路径为：" + this.fullUrl;
    },
    resultString: function () {
      return JSON.stringify(this.result);
    },
    paramObject: function () {
      return JSON.parse(this.param);
    },
  },
  methods: {
    resetToDefault() {
      this.rootUrl = this.$api.rootUrl;
      this.path = "";
      this.param = "{}";
      this.content = "";
      this.setStorage();
    },
    async getResult() {
      let result_temp = await this.$http.get(this.fullUrl);
      if (result_temp != null) {
        this.result = result_temp.data;
      }
      if (result_temp.data.quill != null) {
        this.quill = result_temp.data.quill;
      }
      if (result_temp.data.imgUrl != null) {
        this.imgUrl = result_temp.data.imgUrl;
      }
      console.log(result_temp);
      this.setStorage();
    },
    async postResult() {
      let result_temp = await this.$http.post(this.fullUrl, this.paramObject);
      if (result_temp != null) {
        this.result = result_temp.data;
      }
      if (result_temp.data.quill != null) {
        this.quill = result_temp.data.quill;
      }
      if (result_temp.data.imgUrl != null) {
        this.imgUrl = result_temp.data.imgUrl;
      }
      console.log(result_temp);
      this.setStorage();
    },
    setStorage() {
      window.sessionStorage.setItem("rootUrl", this.rootUrl);
      window.sessionStorage.setItem("path", this.path);
      window.sessionStorage.setItem("param", this.param);
      window.sessionStorage.setItem("content", this.content);
    },
    transferToQuill() {
      this.quill = this.content;
      this.result = this.content;
      this.setStorage();
    },
    setToken() {
      window.sessionStorage.setItem("token", this.token);
    },
    clearToken() {
      window.sessionStorage.removeItem("token", this.token);
      this.token = "";
    },
    generateMd5(md5In) {
      this.md5Out = this.$md5(md5In);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.text1 {
  font-size: 16px;
  /*color: #409EFF;*/
}
.box-card1 {
  width: 95%;
  height: 40px;
  padding: 2px;
  margin: 10px;

  display: flex;
  align-items: center;
}
.box-card1 img {
  height: 20px;
}
.chart-card {
  width: 95%;
  margin: 10px;
  padding: 2px;
  /* margin-bottom: 50px; */
  align-items: center;
}
#box-card2 {
  width: 95%;
  margin: 10px;
  padding: 2px;
  /* margin-bottom: 50px; */
  align-items: center;
}

#announce {
  width: 95%;
  height: 300px;
  padding: 2px;
  margin-left: 10px;
  margin-top: 30px;
  margin-right: 20px;
}

#announce_head {
  display: flex;
}

#announce_head img {
  height: 30px;
  margin-right: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.card-row {
  margin-bottom: 40px;
  height: 420px;
  display: flex;
  flex-wrap: wrap;
}
.card-row2 {
  margin-bottom: 40px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
}
.card-row3 {
  margin-bottom: 40px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
}

.url-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}

.string-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}
.quill-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}
.token-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}

.md5-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}
.image-card {
  /*min-width: 100%;*/
  height: 100%;
  margin-right: 20px;
  padding: "20px";

  /*transition: all .5s;*/
}
.button {
  padding: 5px;
}
</style>
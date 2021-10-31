<template>
  <div>
    <v-container class="mb-5">
      <div>
        <div><v-text-field outlined dense append-icon="" /></div>
        <div class="flex-grow-0">
          <v-btn color="primary">Add Comment</v-btn>
        </div>
      </div>
    </v-container>
    <div>
      <div class="d-flex flex-column">
        <v-row align="start" justify="start">
          <v-col class="flex-grow-0">
            <v-avatar color="red" size="40" />
          </v-col>
          <v-col>
            <p class="mb-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius aut
              unde error? Saepe, magni ab! Incidunt voluptates fuga ad quae
              asperiores laboriosam voluptate sunt esse error dolorem
            </p>
            <small>by username 1 hr ago</small>

            <div class="mt-5 ml-5">
              <h4 class="my-5">Replies</h4>

              <p class="mb-0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
                provident?
              </p>
              <small>by username 2, 30min ago</small>

              <div align="start" justify="start" class="mt-5">
                <div><v-text-field outlined dense /></div>
                <div class="flex-grow-0">
                  <v-btn color="primary">reply</v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comments',
}
</script>

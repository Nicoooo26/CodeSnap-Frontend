<script setup lang="ts">

</script>

<template>
    <TabView class="space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-image text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">posts</span>
              </div>
            </template>
            <div class="m-0">
              <div class="flex flex-wrap -mx-px md:-mx-3">
                <div class="w-1/3 p-px md:px-3">
                  <a href="#">
                    <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img class="w-full h-full absolute left-0 top-0 object-cover"
                        src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="image" />
                      <i class="fas fa-square absolute right-0 top-0 m-1"></i>
                      <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div class="flex justify-center items-center space-x-4 h-full">
                          <span class="p-2">
                            <i class="pi pi-heart"></i>
                            4
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
                <div class="w-1/3 p-px md:px-3">
                  <a href="#">
                    <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img class="w-full h-full absolute left-0 top-0 object-cover"
                        src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="image" />
                      <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div class="flex justify-center items-center space-x-4 h-full">
                          <span class="p-2">
                            <i class="pi pi-heart"></i>
                            412K
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
                <div class="w-1/3 p-px md:px-3">
                  <a href="#">
                    <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img class="w-full h-full absolute left-0 top-0 object-cover"
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="image" />
                      <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div class="flex justify-center items-center space-x-4 h-full">
                          <span class="p-2">
                            <i class="pi pi-heart"></i>
                            112K
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
                <div class="w-1/3 p-px md:px-3">
                  <a href="#">
                    <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img class="w-full h-full absolute left-0 top-0 object-cover"
                        src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="image" />
                      <i class="fas fa-video absolute right-0 top-0 m-1"></i>
                      <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div class="flex justify-center items-center space-x-4 h-full">
                          <span class="p-2">
                            <i class="pi pi-heart"></i>
                            841K
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
                <div class="w-1/3 p-px md:px-3">
                  <a href="#">
                    <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img class="w-full h-full absolute left-0 top-0 object-cover"
                        src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                        alt="image" />
                      <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div class="flex justify-center items-center space-x-4 h-full">
                          <span class="p-2">
                            <i class="pi pi-heart"></i>
                            120K
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
                
              </div>
            </div>
          </TabPanel>
          <TabPanel>

            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-code text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">scripts</span>
              </div>
            </template>
            <div class="m-0">No existen scripts actualmente</div>
          </TabPanel>
          <TabPanel>

            <template #header>
              <div class="flex align-items-center gap-2">
                <i class="pi  pi-comments text-xl md:text-xs"></i>
                <span class="font-bold white-space-nowrap">foros</span>
              </div>
            </template>
            <div class="m-0">No existen foros actualmente</div>
          </TabPanel>
        </TabView>
</template>

<style scoped>

</style>
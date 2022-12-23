<template>
  <div class="hero py-32 bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <img
        :src="
          'http://localhost:1337' +
          event.data.attributes.Thumbnail.data.attributes.formats.small.url
        "
        class="max-w-md rounded-lg shadow-2xl"
      />
      <div class="ml-16">
        <div class="flex">
          <div
            class="flex gap-2 mb-6 items-center bg-base-100 py-2 px-4 rounded-xl"
          >
            <Icon name="ion:calendar-outline" size="26px" class="mr-1" />
            <span class="font-bold"
              >{{
                start.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </span>
            <span class="font-bold">/</span>
            <span class="font-bold">{{
              end.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            }}</span>
          </div>
        </div>
        <h1 class="text-5xl font-bold">{{ event.data.attributes.Title }}</h1>
        <p class="py-6">
          {{ event.data.attributes.Description }}
        </p>
        <button
          class="btn btn-primary w-44"
          :class="
            new Date(event.data.attributes.Start) < new Date()
              ? 'btn-disabled'
              : ''
          "
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
  <div
    class="w-[1280px] mx-auto py-28"
    v-if="event.data.attributes.Teachers.data.length !== 0"
  >
    <h2 class="text-3xl font-bold text-center mb-6">Your Teachers</h2>
    <p class="max-w-xl pt-2 pb-2 mx-auto text-center">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore fugit
      quos reprehenderit ab vero, dolorem blanditiis officiis! Eligendi, vitae
      laborum.
    </p>
    <div class="pt-36 grid-cols-2 pb-16 grid gap-4">
      <div
        v-for="teacher in event.data.attributes.Teachers.data"
        class="p-6 border-2 rounded-xl"
      >
        <img
          :src="
            config.strapiBase +
            teacher.attributes.Picture.data.attributes.formats.small.url
          "
          class="rounded-md h-24 w-24 object-cover ml-auto -translate-y-3/4 -mb-24"
        />
        <div
          class="py-1 px-3 rounded-md bg-primary text-white font-bold inline"
        >
          {{ teacher.attributes.Subject }}
        </div>
        <h3 class="uppercase font-bold mt-4 text-md text-gray-600 mb-3">
          {{ teacher.attributes.Name }}
        </h3>
        <p class="mb-2">{{ teacher.attributes.Description }}</p>
      </div>
    </div>
  </div>
  <div
    :class="
      event.data.attributes.Teachers.data.length === 0 ? '' : 'bg-base-200'
    "
  >
    <div class="w-[1280px] mx-auto pt-28 pb-44">
      <h2 class="text-3xl font-bold text-center mb-6">Your Schedule</h2>
      <p class="max-w-xl pt-2 pb-2 mx-auto text-center mb-16">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore fugit
        quos reprehenderit ab vero, dolorem blanditiis officiis! Eligendi, vitae
        laborum.
      </p>
      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="day in event.data.attributes.Days.data"
          class="flex items-center flex-col"
        >
          <div
            class="py-1 px-3 rounded-md bg-primary text-white font-bold text-center inline"
          >
            {{
              new Date(day.attributes.Date).toLocaleDateString(locale, {
                weekday: "long",
              })
            }}
          </div>
          <table class="table table-zebra w-full mt-4 rounded-2xl shadow-lg">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Time</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in day.attributes.Activity">
                <th class="text-gray-300">{{ index + 1 }}</th>
                <td>
                  {{ activity.Time.slice(0, 5) }}
                </td>
                <td>{{ activity.Subject }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="w-[900px] mx-auto pt-28 pb-36">
    <h2 class="text-3xl font-bold text-center mb-6">Interested?</h2>
    <p class="max-w-xl pt-2 pb-2 mx-auto text-center mb-16">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore fugit
      quos reprehenderit ab vero, dolorem blanditiis officiis! Eligendi, vitae
      laborum.
    </p>
    <div class="p-6 rounded-xl shadow-lg mt-20 grid grid-cols-2 gap-4">
      <div class="rounded-md p-4 bg-base-200 flex justify-between items-bottom">
        <div>
          <p class="text-2xl font-bold">Price</p>
          <p class="italic">Without Accomodation</p>
        </div>
        <span class="text-2xl font-bold"
          >€{{ event.data.attributes.Price }}</span
        >
      </div>
      <div
        class="border-2 rounded-md flex justify-center items-center p-4 gap-2"
      >
        <a
          :href="
            config.strapiBase +
            event.data.attributes.Program.data.attributes.url
          "
          target="_blank"
          class="btn btn-primary"
          >Download the Program</a
        >
        <button class="btn btn-secondary">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { findOne } = useStrapi();

const event = await findOne("events", route.params.id, {
  populate: {
    Teachers: {
      populate: "*",
    },
    Thumbnail: "*",
    Days: {
      populate: "*",
    },
    Price: "*",
    Program: "*",
  },
});

const start = new Date(event.data.attributes.Start);
const end = new Date(event.data.attributes.End);

const config = useRuntimeConfig();
</script>
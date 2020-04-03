<template>
<div>
    <button type="button" class="btn btn-outline-danger fullWidth" data-toggle="modal" :data-target="'#' + modId">
        {{ action }} {{textRef}}
    </button>
    <!-- Modal -->
    <div class="modal fade" :id="modId" data-backdrop="static" tabindex="-1" role="dialog"
        :aria-labelledby="modId + 'Label'" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" :id="modId + 'Label'">Are you sure?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body d-flex flex-column">
                    <button type="button" class="btn btn-secondary mb-3" data-dismiss="modal">Close</button>
                    <button @click="sendAction" type="button" class="btn btn-danger">Yes, I want to {{ action }} {{textRef}}</button>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        textRef: {type: String, required: true},
        modId: {type: String, required: true},
        action: {type: String, required: true }
    },
    methods:{
        sendAction(){
            this.$emit('notify')
            $(`#${this.modId}`).modal('hide')
        }
    }
}
</script>

<style>
.fullWidth{
    width: 100%;
}
</style>
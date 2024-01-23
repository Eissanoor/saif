module.exports = class response {
    constructor(status, success, message, data) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
    }

    toJson() {
        return {
            status: this.status,
            success: this.success,
            message: this.message,
            data: this.data
        };
    }
}
import dayjs from "dayjs"

export class Ticket
{
    constructor (publicKey, accountData) {
        this.publicKey = publicKey
        this.owner = accountData.owner
        this.timestamp = accountData.timestamp.toString()
        this.number = accountData.number
        this.country = accountData.country
    }

    get key () {
        return this.publicKey.toBase58()
    }

    get owner_display () {
        const owner = this.owner.toBase58()
        return owner.slice(0,4) + '..' + owner.slice(-4)
    }

    get created_at () {
        return dayjs.unix(this.timestamp).format('lll')
    }

    get created_ago () {
        return dayjs.unix(this.timestamp).fromNow()
    }
}
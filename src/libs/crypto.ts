import crypto from 'crypto'

const algorithm = 'aes-256-ctr'

const randomBytes = (size: number): Buffer => {
    return crypto.randomBytes(size)
}

interface IEncryptReturn {
    cnt: string
    eas: string
}

const encrypt = (payload: crypto.BinaryLike, key: crypto.CipherKey): IEncryptReturn => {
    const iv = randomBytes(16)
    const chiper = crypto.createCipheriv(algorithm, key, iv)
    const encrypted = Buffer.concat([chiper.update(payload), chiper.final()])

    return {
        cnt: encrypted.toString('hex'),
        eas: iv.toString('hex')
    }
}

const decrypt = (hash: string, iv: string, key: string): string => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])

        return decrypted.toString()
    } catch (err) {
        return ''
    }
}

export default {
    decrypt,
    encrypt,
    randomBytes
}

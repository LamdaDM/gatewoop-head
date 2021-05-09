import { DB_MySQL } from "src/common/mysql.conn.provider";

export class HelperRepository {
    async addDynamicParams(count: number): Promise<string> {
        let parameterStr: string = "?";
        for (let  i = 0; i < count - 1; i++) {
            parameterStr = parameterStr + ", ?"
        }

        return parameterStr;
    }
}
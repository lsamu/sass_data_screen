import { projectStore } from "../../store/projectStore"

const useProject = projectStore();

class EnvUtil {

    myMap = new Map<string, string>();

    // 获取
    public get(name, mo) {

        if (this.myMap.has(name)) {
            return this.myMap.get(name)
        }

        return mo;
    }

    // 设置
    public set(name, val) {
        this.myMap.set(name,val);
    }


}
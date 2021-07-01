/**
 * @param title string 标题
 * @param content string 内容
 * @param onOk function 确定函数
 * @param onCancel function 取消函数
 */
import {
    Modal
} from 'ant-design-vue';

export default function showDelConfirm(obj) {
    Modal.confirm({
        title: obj.title || '您确定要删除该项吗?',
        content: obj.content || '删除后将不能恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            obj.onOk()
        },
        onCancel() {
            Modal.destroyAll();
        },
    });
}
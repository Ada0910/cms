package com.cms.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;

public class ImageUtil {

    public static void main(String[] args) {
        // TODO Auto-generated method stub

    }

    /**
     * �ı�ͼƬ�Ĵ�С����Ϊsize��Ȼ������ſ�ȱ����仯
     *
     * @param is     �ϴ���ͼƬ��������
     * @param os     �ı���ͼƬ�Ĵ�С�󣬰�ͼƬ���������Ŀ��OutputStream
     * @param size   ��ͼƬ�Ŀ�
     * @param format ��ͼƬ�ĸ�ʽ
     * @throws IOException
     */
    public static void resizeImage(InputStream is, OutputStream os, int size, String format) throws IOException {
        BufferedImage prevImage = ImageIO.read(is);
        double width = prevImage.getWidth();
        double height = prevImage.getHeight();
        double percent = size / width;
        int newWidth = (int) (width * percent);
        int newHeight = (int) (height * percent);
        BufferedImage image = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_BGR);
        Graphics graphics = image.createGraphics();
        graphics.drawImage(prevImage, 0, 0, newWidth, newHeight, null);
        ImageIO.write(image, format, os);
        os.flush();
        is.close();
        os.close();
    }


}

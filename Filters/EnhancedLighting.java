package Filters;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.Vector2f;
import com.jme3.post.Filter;
import com.jme3.renderer.RenderManager;
import com.jme3.renderer.ViewPort;
import com.jme3.texture.Image;
import java.util.ArrayList;

public class EnhancedLighting extends Filter {

    private Material preHdrMaterial;
    private Material blurMaterialH;
    private Material blurMaterialV;
    private Pass preHdrPass;
    private Pass HDRPass;
    private Pass blurPassH;
    private Pass blurPassV;
    private boolean bloom;
    private float exposure;
    private float brightness;
    private float radius;

    public EnhancedLighting() {
        super("EnhancedLighting");
    }

    @Override
    protected boolean isRequiresDepthTexture() {
        return false;
    }

    @Override
    protected void initFilter(AssetManager manager, RenderManager renderManager, ViewPort vp, int w, int h) {
        material = new Material(manager, "Dingo/MatDefs/EnhancedLighting/EnhancedLighting.j3md");
        preHdrMaterial = new Material(manager, "Dingo/MatDefs/EnhancedLighting/PrePass.j3md");
        blurMaterialH = new Material(manager, "Dingo/MatDefs/EnhancedLighting/Blur.j3md");
        blurMaterialV = new Material(manager, "Dingo/MatDefs/EnhancedLighting/Blur.j3md");
        
        preHdrPass = new Pass() {
            @Override
            public boolean requiresSceneAsTexture() {
                return true;
            }
        };
        blurPassH = new Pass() {
            @Override
            public boolean requiresSceneAsTexture() {
                return false;
            }
        };
        blurPassV = new Pass() {
            @Override
            public boolean requiresSceneAsTexture() {
                return false;
            }
        };
        HDRPass = new Pass() {
            @Override
            public boolean requiresSceneAsTexture() {
                return true;
            }
        };

        preHdrPass.init(renderManager.getRenderer(), w, h, Image.Format.RGBA32F, Image.Format.Depth, 1, preHdrMaterial);
        blurPassH.init(renderManager.getRenderer(), w, h, Image.Format.RGBA32F, Image.Format.Depth, 1, blurMaterialH);
        blurPassV.init(renderManager.getRenderer(), w, h, Image.Format.RGBA32F, Image.Format.Depth, 1, blurMaterialV);
        HDRPass.init(renderManager.getRenderer(), w, h, Image.Format.RGBA8, Image.Format.Depth, 1, material);
        
        postRenderPasses = new ArrayList<Pass>();
        postRenderPasses.add(preHdrPass);
        postRenderPasses.add(blurPassH);
        postRenderPasses.add(blurPassV);
        postRenderPasses.add(HDRPass);
        
        preHdrMaterial.setFloat("brightness", brightness);
        
        blurMaterialH.setVector2("direction", new Vector2f(1.0f, 0.0f));
        blurMaterialH.setFloat("radius", radius);
        
        blurMaterialV.setVector2("direction", new Vector2f(0.0f, 1.0f));
        blurMaterialV.setFloat("radius", radius);
        
        blurMaterialH.setTexture("input", preHdrPass.getRenderedTexture());
        blurMaterialV.setTexture("input", blurPassH.getRenderedTexture());
        material.setTexture("lighting", blurPassV.getRenderedTexture());
        material.setBoolean("bloom", bloom);
        material.setFloat("exposure", exposure);
    }

    @Override
    protected Material getMaterial() {
        return material;
    }

    public boolean isBloom() {
        return bloom;
    }

    public void setBloom(boolean bloom) {
        this.bloom = bloom;
    }

    public float getExposure() {
        return exposure;
    }

    public void setExposure(float exposure) {
        this.exposure = exposure;
    }

    public float getBrightness() {
        return brightness;
    }

    public void setBrightness(float brightness) {
        this.brightness = brightness;
    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }
    
}
